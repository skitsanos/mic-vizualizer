import {VisualizerFunction} from './core';

const visualizationSpiral: VisualizerFunction = ({
                                                     ctx,
                                                     dataArray,
                                                     bufferLength,
                                                     canvas,
                                                     volume
                                                 }) =>
{
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 10;

    ctx.beginPath();
    ctx.strokeStyle = `hsl(${volume * 360}, 100%, 50%)`;
    ctx.lineWidth = 4;

    for (let i = 0; i < bufferLength; i++)
    {
        const t = i / bufferLength;
        const angle = t * Math.PI * 20;
        const radius = t * maxRadius;
        const amplitude = ((dataArray[i] - 128) / 128) * 20 * (1 + volume);
        const x = centerX + (radius + amplitude) * Math.cos(angle);
        const y = centerY + (radius + amplitude) * Math.sin(angle);

        if (i === 0)
        {
            ctx.moveTo(x, y);
        }
        else
        {
            ctx.lineTo(x, y);
        }
    }

    ctx.stroke();
};

export default visualizationSpiral;