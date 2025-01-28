import { Sighting } from "@/types";
import { Popup } from "react-leaflet/Popup";
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { updateSightingThumbs } from '../actions/UpdateData';

export default function MapPopup(sighting: Sighting) {
    const handleThumbsUp = async () => {
        try {
            // if (localStorage.getItem(sighting.id.toString())) {

            // }
            const response = await updateSightingThumbs(sighting.id, true);
            if (response.success) {
                console.log('Thumbs Down updated successfully');
                localStorage.setItem("id", sighting.id.toString() + "//" + "thumbsup")
            } else {
                console.error('Error updating thumbs up:', response.error);
            }
        } catch (error) {
            console.error('Error handling thumbs up click:', error);
        }
    };

    const handleThumbsDown = async () => {
        try {
            const response = await updateSightingThumbs(sighting.id, false);
            if (response.success) {
                console.log('Thumbs Down updated successfully');
                localStorage.setItem("id", sighting.id.toString() + "//" + "thumbsdown")
                // Optionally, you can update the local state or refetch the data here.
            } else {
                console.error('Error updating thumbs down:', response.error);
            }
        } catch (error) {
            console.error('Error handling thumbs down click:', error);
        }
    };

    return (
        <Popup>
            <div className="p-2">
                <p>Count: {sighting.count}</p>
                <p>Certainty: {sighting.certainty}%</p>
                <p>{new Date(sighting.createdAt).toLocaleString('en-GB')}</p>
                <div className="flex justify-between">
                    <button onClick={handleThumbsUp} className="hover:scale-110">
                        <ThumbsUp color="blue" />
                    </button>
                    <button onClick={handleThumbsDown} className="hover:scale-110">
                        <ThumbsDown color="red" fill="red" />
                    </button>
                </div>
            </div>
        </Popup>
    );
}
