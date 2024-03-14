"use client"

import { signOut } from "next-auth/react"

export default function LogoutButton() {
    const handleLogout = () => {
        signOut({redirect: true, callbackUrl: "/"});
    }
    return (
        <button onClick={handleLogout}>
            로그아웃
        </button>
    )
}