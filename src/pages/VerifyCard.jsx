import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyCardSheet from "@/components/VerifyCardSheet";

export default function VerifyCard() {
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(true);

  const handleClose = () => {
    setSheetOpen(false);
    navigate(-1);
  };

  return (
    <VerifyCardSheet open={sheetOpen} onClose={handleClose} />
  );
}