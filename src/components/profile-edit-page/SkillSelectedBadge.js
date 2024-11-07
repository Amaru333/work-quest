import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";

function SkillSelectedBadge({ children, onClick }) {
  return (
    <Badge variant="outline" className="border-primary-100 bg-white cursor-pointer" onClick={onClick}>
      <p className="text-primary-100 font-medium mr-1">{children}</p>
      <Image src="/icons/close-small-blue.svg" alt="close" width={8} height={8} />
    </Badge>
  );
}

export default SkillSelectedBadge;
