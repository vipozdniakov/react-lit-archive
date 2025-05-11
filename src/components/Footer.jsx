import React from "react";

export function Footer() {
  return (
    <footer className="mt-12 text-center text-sm text-textSecondary leading-relaxed">
      © {new Date().getFullYear()} Виталий Поздняков. Все тексты защищены
      авторским правом. <br />
      Копирование или распространение без согласия автора запрещено.
    </footer>
  );
}
