import type { Contributor } from "./DataInterface";

export interface ContributorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contributor: Contributor) => void;
  contributorToEdit?: Contributor;
}