import type { ComponentType, SVGProps } from "react";
import {
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    MailIcon,
    TiktokIcon,
    XIcon,
    YoutubeIcon,
} from "@/components/ui/SocialIcons";
import { PhoneIcon, PinIcon } from "@/components/ui/Icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type ContactInfoItem = {
    name: string;
    value: string;
    url: string;
    icon: IconComponent;
};

export const contactInfo: ContactInfoItem[] = [
    {
        name: "Facebook",
        value: "https://www.facebook.com/share/169Q1wwNbp/?mibextid=wwXIfr",
        url: "https://www.facebook.com/share/169Q1wwNbp/?mibextid=wwXIfr",
        icon: FacebookIcon,
    },
    {
        name: "Instagram",
        value: "https://www.instagram.com/tetrag_arts",
        url: "https://www.instagram.com/tetrag_arts",
        icon: InstagramIcon,
    },
    {
        name: "Twitter",
        value: "https://x.com/tetrag_arts?s=21",
        url: "https://x.com/tetrag_arts?s=21",
        icon: XIcon,
    },
    {
        name: "LinkedIn",
        value: "https://www.linkedin.com/in/tetra-g-22416324b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        url: "https://www.linkedin.com/in/tetra-g-22416324b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        icon: LinkedinIcon,
    },
    {
        name: "YouTube",
        value: "https://www.youtube.com/@tetrag_arts",
        url: "https://www.youtube.com/@tetrag_arts",
        icon: YoutubeIcon,
    },
    {
        name: "TikTok",
        value: "https://www.tiktok.com/@tetrag_arts?_t=ZM-8vC3Gxcm486&_r=1",
        url: "https://www.tiktok.com/@tetrag_arts?_t=ZM-8vC3Gxcm486&_r=1",
        icon: TiktokIcon,
    },
    {
        name: "Email",
        value: "georgeragui70@gmail.com",
        url: "mailto:georgeragui70@gmail.com",
        icon: MailIcon,
    },
    {
        name: "Phone",
        value: "+254 706 003 630",
        url: "tel:+254706003630",
        icon: PhoneIcon,
    },
    {
        name: "Location",
        value: "Nyeri, Kenya",
        url: "https://goo.gl/maps/7Z1g5k6v1y8Q2J9A9",
        icon: PinIcon,
    },
];

const socialNames = ["Facebook", "Instagram", "Twitter", "LinkedIn", "YouTube", "TikTok"];

export const socialLinks = contactInfo.filter((item) => socialNames.includes(item.name));

export const directContactDetails = contactInfo.filter((item) => !socialNames.includes(item.name));
