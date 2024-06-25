import React, {useCallback, useEffect, useRef, useState} from 'react';
import {VisualizationParams, VisualizationType} from '@/components/MicVisualizer/visualizers/core';
import visualizationBars from '@/components/MicVisualizer/visualizers/visualizationBars';
import visualizationWave from '@/components/MicVisualizer/visualizers/visualizationWave';
import visualizationSpiral from '@/components/MicVisualizer/visualizers/visualizationSpiral';
import visualizationParticles from '@/components/MicVisualizer/visualizers/visualizationParticles';
import visualizationFrequencySpectrum from '@/components/MicVisualizer/visualizers/visualizationFrequencySpectrum';
import visualizationCircularWaveform from '@/components/MicVisualizer/visualizers/visualizationCircularWaveform';

const visualizers = {
    bars: visualizationBars,
    wave: visualizationWave,
    spiral: visualizationSpiral,
    particles: visualizationParticles,
    frequencySpectrum: visualizationFrequencySpectrum,
    circularWaveform: visualizationCircularWaveform
};

interface MicVisualizerProps
{
    type?: VisualizationType;
}

const MicVisualizer: React.FC<MicVisualizerProps> = ({type = 'wave'}) =>
{
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const animationRef = useRef<number>();

    const startVisualization = useCallback(async () =>
    {
        if (isRecording)
        {
            stopVisualization();
            return;
        }

        const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(newAudioContext);

        const newAnalyser = newAudioContext.createAnalyser();
        newAnalyser.fftSize = 1024;
        setAnalyser(newAnalyser);

        try
        {
            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            const source = newAudioContext.createMediaStreamSource(stream);
            source.connect(newAnalyser);
            setIsRecording(true);

            const canvas = canvasRef.current;
            if (!canvas)
            {
                return;
            }

            const ctx = canvas.getContext('2d');
            if (!ctx)
            {
                return;
            }

            const bufferLength = newAnalyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const draw = () =>
            {
                animationRef.current = requestAnimationFrame(draw);
                newAnalyser.getByteTimeDomainData(dataArray);

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Calculate volume
                let sum = 0;
                for (let i = 0; i < bufferLength; i++)
                {
                    sum += dataArray[i];
                }
                const average = sum / bufferLength;
                const volume = (average - 128) / 128;

                const visualizationParams: VisualizationParams = {
                    ctx,
                    dataArray,
                    bufferLength,
                    canvas,
                    volume
                };

                const selectedVisualizer = visualizers[type];
                selectedVisualizer(visualizationParams);
            };

            draw();
        }
        catch (error)
        {
            console.error('Error accessing microphone:', error);
        }
    }, [isRecording, type]);

    const stopVisualization = useCallback(() =>
    {
        if (!isRecording)
        {
            return;
        }

        setIsRecording(false);
        if (animationRef.current)
        {
            cancelAnimationFrame(animationRef.current);
        }
        if (audioContext)
        {
            audioContext.close();
            setAudioContext(null);
        }
        setAnalyser(null);
    }, [isRecording, audioContext]);

    useEffect(() =>
    {
        return () =>
        {
            stopVisualization();
        };
    }, [stopVisualization]);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            <canvas ref={canvasRef}
                    width="400"
                    height="400"
                    className="absolute"/>
            <button
                onClick={startVisualization}
                className="z-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                {isRecording ? 'Stop' : 'Talk'}
            </button>
        </div>
    );
};

export default MicVisualizer;