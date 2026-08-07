import "../globals.css";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import AuthRedirect from "@/components/layout/auth-redirect";

export default function RootLayout({ children }) {
  return (
    <>
      <AuthRedirect />
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  );
}
