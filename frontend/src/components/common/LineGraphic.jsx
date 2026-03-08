import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';

export default function LineGraphic() {
    return (
        <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
            series={[
                {
                    data: [2, 5, 9, 3, 7, 5, 8, 6, 4, 7],
                },
            ]}
            width={500}
            height={300}
        />
    )
}