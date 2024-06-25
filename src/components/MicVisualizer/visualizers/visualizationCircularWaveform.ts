import {VisualizerFunction} from './core';

const visualizationCircularWaveform: VisualizerFunction = ({
                                                               ctx,
                                                               dataArray,
                                                               bufferLength,
                                                               canvas,
                                                               volume
                                                           }) =>
{
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.beginPath();
    ctx.strokeStyle = `hsl(${volume * 360}, 100%, 50%)`;
    ctx.lineWidth = 2;

    for (let i = 0; i < bufferLength; i++)
    {
        const angle = (i / bufferLength) * Math.PI * 2 - Math.PI / 2;
        const amplitude = ((dataArray[i] - 128) / 128) * 30 * (1 + volume);
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

    ctx.closePath();
    ctx.stroke();
};

export default visualizationCircularWaveform;