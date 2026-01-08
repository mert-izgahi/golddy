"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import { useLangStore } from "@/store/lang-store";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

function DateTimeArea() {
    const { lang } = useLangStore();
    const [now, setNow] = useState(dayjs());

    // update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(dayjs());
        }, 1000);

        return () => clearInterval(timer); // cleanup
    }, []);

    const localized = now.locale(lang);
    const date = localized.format("LL"); // e.g., January 8, 2026 or ٨ يناير ٢٠٢٦
    const time = localized.format("LTS"); // e.g., 10:45:22 PM or ١٠:٤٥:٢٢ م

    return (
        <span dir={lang === "ar" ? "rtl" : "ltr"}>
            {date} , {time}
        </span>
    );
}

export default DateTimeArea;
