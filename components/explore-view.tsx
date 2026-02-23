"use client"

const hotNeighborhoods = [
  {
    name: "부산진구 전포동",
    tag: "☕️ 카페거리 수다방",
  },
  {
    name: "수영구 민락동",
    tag: "🐟 회센터 실시간",
  },
  {
    name: "영도구 청학동",
    tag: "🌉 야경 핫플",
  },
]

export function ExploreView() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <h1 className="font-bold text-gray-900">
          🔍 어느 동네 라디오를 들어볼까요?
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-gray-100 rounded-xl p-3.5 text-gray-400 text-sm mb-6" role="search">
          동네 이름(구, 동)으로 검색
        </div>

        <h2 className="font-bold text-gray-900 mb-3">🔥 지금 가장 핫한 동네</h2>

        <div className="space-y-3">
          {hotNeighborhoods.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-sm text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.tag}</p>
              </div>
              <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-bold text-sm active:bg-gray-200 transition-colors">
                입장
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
