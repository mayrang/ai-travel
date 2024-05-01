import styles from "./SelectedPlaces.module.css";

export default function SelectedPlaces() {
  return (
    <section className={styles.conateiner}>
      <h2 className={styles.title}>선택한 여행지</h2>
      <div className={styles.addButtonContainer}>
        <button className={styles.addButton}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 21 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L12 20M20 12L4 12"
              stroke="#48A7F8"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>장소 추가</span>
        </button>
      </div>
    </section>
  );
}
