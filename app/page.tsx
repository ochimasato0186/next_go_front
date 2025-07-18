import Image from "next/image";
import SmartphoneFrame from "../components/SmartphoneFrame";
import stylesBtn from "../styles/button.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SmartphoneFrame>
        <main className="flex flex-col items-center gap-4">
          <h1>ログイン画面</h1>
          <p>ここに先生向けの機能やUIを追加できます。</p>
          {/* ログイン画面：生徒側ボタン */}
          <Link href="/student">
            <button className={`px-4 py-2 rounded hover:bg-blue-600 ${stylesBtn.loginStudentBtn}`}>
              生徒側
            </button>
          </Link>
          {/* ログイン画面：先生側ボタン */}
          <Link href="/teacher">
            <button className={`px-4 py-2 rounded hover:bg-green-600 ${stylesBtn.loginTeacherBtn}`}>
              先生側
            </button>
          </Link>
          {/* ログイン画面：管理者ボタン */}
          <Link href="/maker">
            <button className={`px-4 py-2 rounded hover:bg-yellow-600 ${stylesBtn.loginMakerBtn}`}>
              管理者
            </button>
          </Link>
        </main>
      </SmartphoneFrame>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
