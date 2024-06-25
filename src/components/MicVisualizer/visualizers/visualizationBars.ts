import {VisualizationParams} from '@/components/MicVisualizer/visualizers/core';

const visualizationBars = ({
                               ctx,
                               dataArray,
                               bufferLength,
                               canvas,
                               volume
                           }: VisualizationParams) =>
{
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 50;

    for (let i = 0; i < bufferLength; i++)
    {
        const barHeight = (dataArray[i] - 128) * 1.5 * (1 + volume);
        const angle = (i / bufferLength) * Math.PI * 2 - Math.PI / 2;
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);

        ctx.strokeStyle = `hsl(${i * 360 / bufferLength}, 100%, ${50 + volume * 25}%)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
};

export default visualizationBars;