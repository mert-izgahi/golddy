import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLang } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.ComponentProps<"input"> { }


function PasswordInput({ value, onChange, ...props }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { lang } = useLang();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                {...props}
            />
            <Button
                type="button"
                className={
                    cn("absolute w-6 h-6", {
                        "right-2 top-1/2 -translate-y-1/2": lang === "en",
                        "left-2 top-1/2 -translate-y-1/2": lang === "ar",
                    })
                }
                variant={"ghost"}
                onClick={togglePasswordVisibility}
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
        </div>
    );
}

export { PasswordInput };
