import React from "react"
import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"

const ResultModal = forwardRef(function ResultModal(
	{ targetTime, remainingTime, onReset },
	ref
) {
	const dialog = useRef()

	const userLost = remainingTime <= 0
	const formattedRemainingTime = (remainingTime / 1000).toFixed(2)
	const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100)

	useImperativeHandle(ref, () => {
		return {
			open() {
				dialog.current.showModal()
			},
		}
	})
	return createPortal(
		<dialog ref={dialog} className="result-modal">
			{userLost && <h2>You Lost </h2>}
			{!userLost && <h2>Your Score: {score}</h2>}
			<p>
				The target time was <strong>{targetTime} seconds.</strong>
			</p>
			<p>
				You stoped the timer with
				<strong> {formattedRemainingTime} seconds left.</strong>
			</p>
			<form method="dialog" onSubmit={onReset}>
				<button>Close</button>
			</form>
		</dialog>,
		document.getElementById("modal")
	)
})

export default ResultModal

// import React from 'react';

// import Toast from './Toast';

// function App() {
//   const [toastVisible, setToastVisible] = React.useState(false);

//   function handleEnrol() {
//     setToastVisible(true);

//     setTimeout(() => {
//       setToastVisible(false);
//     }, 3000);
//   }

//   return (
//     <div id="app">
//       {toastVisible && <Toast message="Enrolled successfully!" />}
//       <article>
//         <h2>React Course</h2>
//         <p>
//           A course that teaches you React from the ground up and in great depth!
//         </p>
//         <button onClick={handleEnrol}>Enrol</button>
//       </article>
//     </div>
//   );
// }

// export default App;
