import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

const animDurationMultiplier = 1;

class Params {
  // static durationBtmSheetEnter = (300 / 1000) * animDurationMultiplier;
  // static durationBtmSheetExit = (200 / 1000) * animDurationMultiplier;
  static durationBtmSheetEnter = (200 / 1000) * animDurationMultiplier;
  static durationBtmSheetExit = (150 / 1000) * animDurationMultiplier;
  static breakPointStandard = 11.8 / 100;
  static easeStandard = CustomEase.create("custom", "M0,0, C0.2, 0, 0, 1, 1,1");
  static easeAccelerate = CustomEase.create(
    "custom",
    "M0,0, C0.3, 0, 1, 1, 1,1"
  );
  static easeDecelerate = CustomEase.create("custom", "M0,0, C0, 0, 0, 1, 1,1");
  static easeSkeletonPulse = CustomEase.create(
    "custom",
    "M0,0, C1, 0, 0.6, 1, 1,1"
  );
}

export { Params };
