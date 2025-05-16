import oneBitComparator from "../premadeFiles/1bitComparator.clc";
import threeBitComparator from "../premadeFiles/3bitComparator.clc";
import eightBitParityGenerator from "../premadeFiles/8bitParityGenerator.clc";
import halfAdder from "../premadeFiles/halfAdder.clc";
import twoBitFullAdder from "../premadeFiles/2bitFullAdder.clc";
import oneBitComparatorImage from "../components/images/oneBitComparator.png";
import threeBitComparatorImage from "../components/images/threeBitComparator.jpg";
import parityGeneratorImage from "../components/images/parityGenerator.webp";
import twoBitFullAdderImage from "../components/images/twoBitFullAdder.png";
import halfAdderImage from "../components/images/halfAdder.png";

const premadeCircuit = [
  {
    title: "8-bit parity generator",
    image: parityGeneratorImage,
    file: eightBitParityGenerator,
  },
  {
    title: "1-bit comparator",
    image: oneBitComparatorImage,
    file: oneBitComparator,
  },
  {
    title: "3-bit comparator",
    image: threeBitComparatorImage,
    file: threeBitComparator,
  },
  {
    title: "half adder",
    image: halfAdderImage,
    file: halfAdder,
  },
  {
    title: "2-bit full adder",
    image: twoBitFullAdderImage,
    file: twoBitFullAdder,
  },
];

export { premadeCircuit };
