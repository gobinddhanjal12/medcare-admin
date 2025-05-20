import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "./components/Header/Header";
import { AuthProvider } from "@/contexts/AuthContext";


export const metadata = {
  title: "Medcare Admin",
  description: "Medcare Admin app",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
