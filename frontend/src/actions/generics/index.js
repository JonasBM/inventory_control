import {
  BaseMixin,
  CreateMixin,
  DestroyMixin,
  ListMixin,
  RetrieveMixin,
  UpdateMixin,
} from "./mixins";

import { applyMixins } from "../../utils";

export class GenericAction extends BaseMixin {}
export class ListAction extends ListMixin {}
export class CreateAction extends CreateMixin {}
export class RetrieveAction extends RetrieveMixin {}
export class UpdateAction extends UpdateMixin {}
export class DestroyAction extends DestroyMixin {}

export class ListCreateAction extends BaseMixin {}
applyMixins(ListCreateAction, [ListMixin, CreateMixin]);

export class ReadOnlyAction extends BaseMixin {}
applyMixins(ReadOnlyAction, [ListMixin, RetrieveMixin]);

export class RetrieveUpdateAction extends BaseMixin {}
applyMixins(RetrieveUpdateAction, [RetrieveMixin, UpdateMixin]);

export class RetrieveDestroyAction extends BaseMixin {}
applyMixins(RetrieveDestroyAction, [RetrieveMixin, DestroyMixin]);

export class RetrieveUpdateDestroyAction extends BaseMixin {}
applyMixins(RetrieveUpdateDestroyAction, [
  RetrieveMixin,
  UpdateMixin,
  DestroyMixin,
]);

export class CRUDAction extends BaseMixin {}
applyMixins(CRUDAction, [
  ListMixin,
  CreateMixin,
  RetrieveMixin,
  UpdateMixin,
  DestroyMixin,
]);
