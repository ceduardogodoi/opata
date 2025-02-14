import { Animal } from "@/app/domain/animal/entity/animal";
import type { Pageable, Paged } from "@/app/types/pagination.types";

export type FindAllAnimalsInputDto = Pageable;

export type FindAllAnimalsOutputDto = Paged<Animal>;
