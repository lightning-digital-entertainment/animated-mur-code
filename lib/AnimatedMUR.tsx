import { useEffect, useState } from "react";
import QRCode, { QRCodeProps } from "react-qr-code";
import * as ur from "ur-wasm-js";

export interface AnimatedMURProps extends QRCodeProps {
  value: string;
  interval: number;
  chunkLength: number;
  size?: number; // defaults to 128
  bgColor?: string; // defaults to '#FFFFFF'
  fgColor?: string; // defaults to '#000000'
  level?: string; // defaults to 'L' , Can be one of 'L,M,H,Q'
}

export function AnimatedMUR({
  value,
  interval,
  chunkLength,
  size,
  bgColor,
  fgColor,
  level,
}: AnimatedMURProps) {
  const [part, setPart] = useState<string>("");

  useEffect(() => {
    // @ts-ignore
    let timer: NodeJS.Timeout;
    if (value) {
      const encoder = new ur.UrEncoder(value, chunkLength);
      timer = setInterval(() => {
        setPart(encoder.next_value());
      }, interval);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [value, chunkLength, interval]);
  return (
    <QRCode
      value={part}
      size={size}
      bgColor={bgColor}
      fgColor={fgColor}
      level={level}
    />
  );
}
