import Link from "next/link";

export default function BeforeLoginHomePage(){
    return (
        <div className="flex items-center justify-center w-screen h-screen gap-4">
            <h1 className=" font-extrabold text-4xl ">Travel Map</h1>
            <Link href={"/signin"} className="text-xl">로그인</Link>
        </div>
    )
}