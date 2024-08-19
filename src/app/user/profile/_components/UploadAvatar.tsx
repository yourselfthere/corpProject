"use client";
import FileInput from "@/app/components/fileUpload";
import { PencilIcon } from "@heroicons/react/16/solid";

import {
  Avatar,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { updateUserAvatar } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import { uploadAvatar } from "@/lib/upload";

const UploadAvatar = ({ userId }: { userId: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  return (
    <div>
      <button onClick={onOpen}>
        <PencilIcon className="w-6 text-slate-400 hover:text-primary transition-colors" />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload Avatar
              </ModalHeader>
              <ModalBody>
                <FileInput
                  onChange={(e) => setImage((e as any).target.files[0])}
                />
                {image && (
                  <Image src={URL.createObjectURL(image)} alt="Uploaded" />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={isSubmitting}
                  onPress={async () => {
                    setIsSubmitting(true);
                    if (!image) {
                      onClose();
                      return;
                    }
                    const avatarUrl = await uploadAvatar(image);
                    const result = await updateUserAvatar(avatarUrl, userId);
                    router.refresh();
                    setIsSubmitting(false);
                    onClose();
                  }}
                >
                  Change Avatar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UploadAvatar;
