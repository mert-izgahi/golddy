"use client";
import { useLang } from "@/hooks/use-lang"
import { Store as StoreIcon } from "lucide-react"
import Link from "next/link"


interface LogoProps {
    size?: number
}

function Logo({ size = 20 }: LogoProps) {
    const { lang } = useLang();
    const label = lang === "en" ? "Gold Store" : "متجر الذهب"
    return (
        <Link href={"/"} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-800 flex items-center justify-center rounded">
                <StoreIcon size={size} className="text-white" />
            </div>
            <span className="font-bold hidden md:inline">{label}</span>
        </Link>
    )
}

export default Logo
