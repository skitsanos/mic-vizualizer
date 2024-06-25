import { VisualizerFunction } from './core';

const visualizationFrequencySpectrum: VisualizerFunction = ({ ctx, dataArray, bufferLength, canvas, volume }) => {
    const barWidth = canvas.width / bufferLength;
    const heightScale = canvas.height / 256;

    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * heightScale;
        const hue = i / bufferLength * 360;
        ctx.fillStyle = `hsl(${hue}, 100%, ${50 + volume * 25}%)`;
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight);
    }
};

export default visualizationFrequencySpectrum;