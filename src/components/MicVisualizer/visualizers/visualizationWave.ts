import {VisualizationParams} from '@/components/MicVisualizer/visualizers/core';

const visualizationWave = ({
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

    ctx.beginPath();
    ctx.strokeStyle = `hsl(${volume * 360}, 100%, 50%)`;
    ctx.lineWidth = 2;

    for (let i = 0; i < bufferLength; i++)
    {
        const angle = (i / bufferLength) * Math.PI * 2 - Math.PI / 2;
        const amplitude = ((dataArray[i] - 128) / 128) * radius * 0.5 * (1 + volume);
        const x = centerX + Math.cos(angle) * (radius + amplitude);
        const y = centerY + Math.sin(angle) * (radius + amplitude);

        if (i === 0)
        {
            ctx.moveTo(x, y);
        }
        else
        {
            ctx.lineTo(x, y);
        }
    }

    ctx.closePath();
    ctx.stroke();
};

export default visualizationWave;