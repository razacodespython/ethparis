import styles from "@/styles/Sidebar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Sidebar() {
  const router = useRouter();
  const routes = ["/profile", "/gift", "/marketplace", "/messages"];
  const icons = [
    { src: "/profile.png", alt: "profile icon" },
    { src: "/gift.svg", alt: "gift icon" },
    { src: "/squares.svg", alt: "squares icon" },
    { src: "/message-rounded.png", alt: "message icon" },
  ];

  return (
    <div className={styles.main}>
      {routes.map((route, index) => {
        const icon = icons[index];
        const isActive = router.pathname === route;
        return (
          <Link href={route} key={index}>
            <img
              src={icon.src}
              alt={icon.alt}
              className={isActive ? styles.activeIcon : styles.icon}
            />
          </Link>
        );
      })}
    </div>
  );
}
