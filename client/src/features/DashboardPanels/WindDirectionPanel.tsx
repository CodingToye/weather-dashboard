import React from 'react';

interface WindDirectionPanelProps {
    windDegree: number;
}

const WindDirectionPanel: React.FC<WindDirectionPanelProps> = ({
    windDegree,
}) => {
    // Calculate rotation angle for the needle based on wind degree
    const rotation = `rotate(${windDegree})`;

    return (
        <div className='compass'>
            <svg
                width='100'
                height='80'
                viewBox='-50 -100 100 200'
                xmlns='http://www.w3.org/2000/svg'
            >
                {/* Draw compass circle */}
                <circle
                    cx='0'
                    cy='0'
                    r='40'
                    stroke='#fff'
                    strokeWidth='2'
                    fill='none'
                />

                {/* Draw needle */}
                <line
                    x1='0'
                    y1='-30'
                    x2='0'
                    y2='0'
                    stroke='#f2651d'
                    strokeWidth='2'
                    transform={rotation}
                />
                <text
                    x='0'
                    y='-50'
                    font-size='2em'
                    textAnchor='middle'
                    fill='white'
                >
                    N
                </text>
                <text x='53' y='5' textAnchor='middle' fill='white'>
                    E
                </text>
                <text x='0' y='60' textAnchor='middle' fill='white'>
                    S
                </text>
                <text x='-55' y='5' textAnchor='middle' fill='white'>
                    W
                </text>
            </svg>
        </div>
    );
};

export default WindDirectionPanel;
