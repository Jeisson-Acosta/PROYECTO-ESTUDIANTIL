import { useParams } from "react-router-dom"
export function ClassDetails() {
    const { asgcod } = useParams()
    console.log(asgcod)
    return (
        <div>
            <h1>ClassDetails</h1>
        </div>
    )
}