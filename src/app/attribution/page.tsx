import Link from "next/link";

export default function AttributionPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-12">
      <div className="w-full max-w-xl">
        <h1
          className="mb-8 text-2xl font-bold text-sumi"
          style={{ fontFamily: "var(--font-serif-jp)" }}
        >
          このアプリについて
        </h1>

        <section className="mb-8">
          <h2
            className="mb-3 text-lg font-bold text-sumi"
            style={{ fontFamily: "var(--font-serif-jp)" }}
          >
            使用データの出典
          </h2>
          <div className="rounded-lg border border-karuta-border bg-karuta-bg p-4 text-sm text-sumi/80 leading-relaxed">
            <dl className="space-y-2">
              <div className="flex gap-2">
                <dt className="min-w-20 font-bold">データ名</dt>
                <dd>小倉百人一首かるたデータ</dd>
              </div>
              <div className="flex gap-2">
                <dt className="min-w-20 font-bold">著作者</dt>
                <dd>Nanako Takahashi</dd>
              </div>
              <div className="flex gap-2">
                <dt className="min-w-20 font-bold">出典元</dt>
                <dd>
                  <a
                    href="https://linkdata.org/work/rdf1s6834i/ogura.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-wa underline underline-offset-2"
                  >
                    linkdata.org/work/rdf1s6834i/ogura.html
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="min-w-20 font-bold">ライセンス</dt>
                <dd>
                  <a
                    href="https://creativecommons.org/licenses/by/3.0/deed.ja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-wa underline underline-offset-2"
                  >
                    Creative Commons 表示 3.0 (CC BY 3.0)
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <Link href="/" className="text-sm text-indigo-wa underline underline-offset-2">
          ← トップに戻る
        </Link>
      </div>
    </div>
  );
}
