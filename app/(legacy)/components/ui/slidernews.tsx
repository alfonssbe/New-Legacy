"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const SliderNews = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    onValueChange?: (value: number[]) => void;
  }
>(({ className, onValueChange, ...props }, ref) => {
  const [sliderValue, setSliderValue] = React.useState<number[]>(
    [props.min! + (props.opensheetvalmin? props.opensheetvalmin : 0), props.max! - (props.max! - (props.opensheetvalmax ? props.opensheetvalmax : props.max!))]
  );
  //@ts-ignore
  const [minVal, setMinVal] = React.useState<string>(props.realdatesvalues[props.min + (props.opensheetvalmin? props.opensheetvalmin : 0)]);
  //@ts-ignore
  const [maxVal, setMaxVal] = React.useState<string>(props.realdatesvalues[props.max - (props.max! - (props.opensheetvalmax ? props.opensheetvalmax : props.max!))]);

  const handleValueChange = (value: number[]) => {
    setSliderValue(value);
    setMinVal(props.realdatesvalues ? props.realdatesvalues[value[0]] : '');
    setMaxVal(props.realdatesvalues ? props.realdatesvalues[value[1]] : '');

    if (onValueChange) {
      onValueChange(value); // Call the callback with the updated value
    }
  };
  
  React.useEffect(() => {
    if (props.resetclicked === "true") {
      setSliderValue([0, props.value?.length! - 1])
      setMinVal(props.realdatesvalues![0])
      setMaxVal(props.realdatesvalues![props.value?.length! - 1])
    }
  }, [props.value, props.resetclicked, props.realdatesvalues]);

  return (
    <>
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
        value={sliderValue}
        onValueChange={handleValueChange}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-slate-300">
          <SliderPrimitive.Range className="absolute h-full bg-foreground" />
        </SliderPrimitive.Track>
        {sliderValue.map((_, index) => (
          <React.Fragment key={index}>
            <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full first-letter:bg-background bg-[rgba(19,82,219,1)] ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 hover:shadow-lg hover:cursor-pointer" />
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
      <div className="w-full text-center text-sm text-black">{minVal} {props.unit} - {maxVal} {props.unit}</div>
    </>
  );
});
SliderNews.displayName = SliderPrimitive.Root.displayName;

export { SliderNews };
