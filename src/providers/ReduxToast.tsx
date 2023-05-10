import React from "react"
import ReduxToastr from "react-redux-toastr"

const ReduxToast = () => {
	return (
		<ReduxToastr
			newestOnTop={false}
			preventDuplicates
			progressBar
			closeOnToastrClick
			timeOut={4000}
			transitionIn={"fadeIn"}
			transitionOut={"fadeOut"}
		/>
	)
}

export default ReduxToast
