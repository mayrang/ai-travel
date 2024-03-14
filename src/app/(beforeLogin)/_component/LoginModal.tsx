"use client"
import { useRouter } from "next/navigation"
import styles from "./LoginModal.module.css"
import {motion} from "framer-motion"
import { MouseEventHandler } from "react";
export default function LoginModal(){
    const router = useRouter();
    const clickBack:MouseEventHandler<HTMLDivElement> = (e) => {
      
        router.back();
    }

    const clickChild:MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
    }

    return (
        <div onClick={clickBack} className={styles.background}>
           
            <motion.div
                onClick={clickChild}
                initial={{translateY: "100%"}}
                animate={{translateY: 0}}
                transition={{
                    duration: 0.5,
                    ease: "linear"
                }}
                className={styles.main}>
                <h1>로그인 하기</h1>
            </motion.div>
    
        </div>
    )
}