import { TextAnimate } from '@/components/ui/text-animate';
import React from 'react'

const Dashpage = () => {
  return (
    <div>
      <TextAnimate  animation="blurInUp" by="character" once>
        Blur in by character
      </TextAnimate>
    </div>
  );
}

export default Dashpage