import React, { useState, useCallback } from 'react';
import './ClickSpark.css';

const ClickSpark = ({
    sparkColor = '#ffffff',
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 650,
    easing = 'ease-out',
    extraScale = 1
}) => {
    const [sparks, setSparks] = useState([]);

    const createSpark = useCallback((x, y) => {
        const newSparks = Array.from({ length: sparkCount }, (_, i) => {
            const angle = (360 / sparkCount) * i;
            const velocity = sparkRadius;
            
            return {
                id: Date.now() + i,
                x,
                y,
                angle,
                velocity,
                size: sparkSize,
                color: sparkColor,
                duration,
                easing,
                scale: extraScale
            };
        });

        setSparks(prev => [...prev, ...newSparks]);

        setTimeout(() => {
            setSparks(prev => prev.filter(spark => !newSparks.find(s => s.id === spark.id)));
        }, duration);
    }, [sparkCount, sparkRadius, sparkSize, sparkColor, duration, easing, extraScale]);

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createSpark(x, y);
    };

    return (
        <div className="click-spark-container" onClick={handleClick}>
            {sparks.map(spark => (
                <div
                    key={spark.id}
                    className="spark"
                    style={{
                        '--spark-x': `${spark.x}px`,
                        '--spark-y': `${spark.y}px`,
                        '--spark-angle': `${spark.angle}deg`,
                        '--spark-velocity': `${spark.velocity}px`,
                        '--spark-size': `${spark.size}px`,
                        '--spark-color': spark.color,
                        '--spark-duration': `${spark.duration}ms`,
                        '--spark-easing': spark.easing,
                        '--spark-scale': spark.scale,
                        left: spark.x,
                        top: spark.y
                    }}
                />
            ))}
        </div>
    );
};

export default ClickSpark;
