import { VisualizerFunction } from './core';

const visualizationRadialGradientWave: VisualizerFunction = ({
                                                                 ctx,
                                                                 dataArray,
                                                                 bufferLength,
                                                                 canvas,
                                                                 volume
                                                             }) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.1, centerX, centerY, radius);
    gradient.addColorStop(0, `hsl(${volume * 360}, 100%, 50%)`);
    gradient.addColorStop(1, `hsl(${(volume * 360 + 180) % 360}, 100%, 50%)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;

    for (let i = 0; i < bufferLength; i++) {
        const angle = (i / bufferLength) * Math.PI * 2;
        const amplitude = ((dataArray[i] - 128) / 128) * radius * 0.5 * (1 + volume);
        const x = centerX + Math.cos(angle) * (radius + amplitude);
        const y = centerY + Math.sin(angle) * (radius + amplitude);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.closePath();
    ctx.stroke();
};

export default visualizationRadialGradientWave;
