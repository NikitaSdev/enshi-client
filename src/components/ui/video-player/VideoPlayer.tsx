import { FC } from "react"

const VideoPlayer: FC<{ kinopoiskId: number }> = ({ kinopoiskId }) => {
	return (
		<div className={"mt-14"}>
			<div id="yohoho" data-kinopoisk={kinopoiskId} />
		</div>
	)
}

export default VideoPlayer
