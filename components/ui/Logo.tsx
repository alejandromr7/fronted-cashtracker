'use client'

import Image from "next/image";

export default function Logo() {
  return (
    <Image src='/logo.svg' alt="Logo Cashtracker" width={0} height={0} priority className="w-full" />
  );
};