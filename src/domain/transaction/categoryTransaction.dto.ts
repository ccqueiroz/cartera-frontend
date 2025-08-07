import { BaseDto } from "../core/baseDto/baseDto.dto";
import { CategoryDescriptionEnum } from "./enum/categoryDescription.enum";
import { CategoryGroupEnum } from "./enum/categoryGroup.enum";
import { CATEGORY_ICON_SLUGS } from "./enum/categoryIconSlug.enum";
import { CategoryType } from "./enum/categoryType.enum";

export type CategoryDescriptionEnumType =
  (typeof CategoryDescriptionEnum)[keyof typeof CategoryDescriptionEnum];

export type CategoryGroupEnumType =
  (typeof CategoryGroupEnum)[keyof typeof CategoryGroupEnum];

export type IconSlug =
  (typeof CATEGORY_ICON_SLUGS)[keyof typeof CATEGORY_ICON_SLUGS];

export type CategoryTransactionDTO = {
  id: string;
  description: string;
  type: CategoryType;
  iconSlug: IconSlug;
  descriptionEnum: CategoryDescriptionEnumType;
  group: CategoryGroupEnumType;
} & BaseDto;
