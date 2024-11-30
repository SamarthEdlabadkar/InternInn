import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation'

export default function Logout(){
    const router = useRouter()

    deleteCookie("user")

    router.push("/logout")
}