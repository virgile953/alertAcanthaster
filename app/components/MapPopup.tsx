"use client";

import { Sighting } from "@/types";
import { Popup } from "react-leaflet/Popup";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { updateSightingThumbs } from "../actions/UpdateData";
import { useEffect, useState } from "react";

interface MapPopupProps {
	sighting: Sighting;
}

export default function MapPopup({ sighting }: MapPopupProps) {
	const [userVote, setUserVote] = useState<"thumbsup" | "thumbsdown" | null>(
		null
	);

	useEffect(() => {
		const storedValue = localStorage.getItem(`vote_${sighting.id}`);
		if (storedValue) {
			setUserVote(storedValue as "thumbsup" | "thumbsdown");
		}
	}, [sighting.id]);

	const handleThumbsUp = async () => {
		try {
			// If already thumbed up, remove the vote
			if (userVote === "thumbsup") {
				const response = await updateSightingThumbs(sighting.id, true, true);
				if (response.success) {
					localStorage.removeItem(`vote_${sighting.id}`);
					setUserVote(null);
				}
				return;
			}

			// Add new vote (will handle removing other vote if exists)
			const response = await updateSightingThumbs(sighting.id, true);
			if (response.success) {
				localStorage.setItem(`vote_${sighting.id}`, "thumbsup");
				setUserVote("thumbsup");
			}
		} catch (error) {
			console.error("Error handling thumbs up click:", error);
		}
	};

	const handleThumbsDown = async () => {
		try {
			// If already thumbed down, remove the vote
			if (userVote === "thumbsdown") {
				const response = await updateSightingThumbs(sighting.id, false, true);
				if (response.success) {
					localStorage.removeItem(`vote_${sighting.id}`);
					setUserVote(null);
				}
				return;
			}

			// Add new vote (will handle removing other vote if exists)
			const response = await updateSightingThumbs(sighting.id, false);
			if (response.success) {
				localStorage.setItem(`vote_${sighting.id}`, "thumbsdown");
				setUserVote("thumbsdown");
			}
		} catch (error) {
			console.error("Error handling thumbs down click:", error);
		}
	};

	return (
		<Popup>
			<div className="p-2">
				<p>Count: {sighting.count}</p>
				<p>Certainty: {sighting.certainty}%</p>
				<p>{new Date(sighting.createdAt).toLocaleString("en-GB")}</p>
				<div className="flex justify-between">
					<button onClick={handleThumbsUp} className="hover:scale-110">
						<ThumbsUp
							color="blue"
							fill={userVote === "thumbsup" ? "#57F" : "none"}
						/>
					</button>
					<button onClick={handleThumbsDown} className="hover:scale-110">
						<ThumbsDown
							color="red"
							fill={userVote === "thumbsdown" ? "#F54" : "none"}
						/>
					</button>
				</div>
			</div>
		</Popup>
	);
}
