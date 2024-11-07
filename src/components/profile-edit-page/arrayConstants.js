import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { PROFILE_EDIT_PAGE_STRINGS } from "@/constants/strings/profileEditPageStrings";

export const SKILLSETS = [
  "React JS",
  "Vue JS",
  "Angular JS",
  "Node JS",
  "Express JS",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Firebase",
  "AWS",
  "Azure",
  "Docker",
  "Next JS",
  "Nuxt JS",
  "Gatsby JS",
  "Svelte JS",
  "Flutter",
  "React Native",
  "Ionic",
  "Kubernetes",
  "Jenkins",
  "Gitlab CI",
  "Github Actions",
  "Circle CI",
  "Travis CI",
  "Heroku",
  "Netlify",
  "Vercel",
  "Digital Ocean",
  "Google Cloud",
  "Microsoft Azure",
].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

export const YEAR_LIST = Array.from({ length: 50 }, (_, i) => i + 1980);

export const MONTH_LIST = [
  { value: "January", label: COMMON_STRINGS.months.january },
  { value: "February", label: COMMON_STRINGS.months.february },
  { value: "March", label: COMMON_STRINGS.months.march },
  { value: "April", label: COMMON_STRINGS.months.april },
  { value: "May", label: COMMON_STRINGS.months.may },
  { value: "June", label: COMMON_STRINGS.months.june },
  { value: "July", label: COMMON_STRINGS.months.july },
  { value: "August", label: COMMON_STRINGS.months.august },
  { value: "September", label: COMMON_STRINGS.months.september },
  { value: "October", label: COMMON_STRINGS.months.october },
  { value: "November", label: COMMON_STRINGS.months.november },
  { value: "December", label: COMMON_STRINGS.months.december },
];

export const EDUCATION_LEVELS = [
  { value: "middle_school", label: PROFILE_EDIT_PAGE_STRINGS.education_level.middle_school },
  { value: "high_school", label: PROFILE_EDIT_PAGE_STRINGS.education_level.high_school },
  { value: "associate_degree", label: PROFILE_EDIT_PAGE_STRINGS.education_level.associate_degree },
  { value: "bachelor_degree", label: PROFILE_EDIT_PAGE_STRINGS.education_level.bachelors_degree },
  { value: "master_degree", label: PROFILE_EDIT_PAGE_STRINGS.education_level.masters_degree },
  { value: "doctorate_degree", label: PROFILE_EDIT_PAGE_STRINGS.education_level.doctorate_degree },
];

export const FIELDS = [
  { value: "information_technology", label: PROFILE_EDIT_PAGE_STRINGS.fields_list.information_technology },
  { value: "business", label: PROFILE_EDIT_PAGE_STRINGS.fields_list.business },
  { value: "arts", label: PROFILE_EDIT_PAGE_STRINGS.fields_list.arts },
  { value: "science", label: PROFILE_EDIT_PAGE_STRINGS.fields_list.science },
  { value: "engineering", label: PROFILE_EDIT_PAGE_STRINGS.fields_list.engineering },
  { value: "medical", label: PROFILE_EDIT_PAGE_STRINGS.fields_list.medical },
  { value: "law", label: PROFILE_EDIT_PAGE_STRINGS.fields_list.law },
  { value: "social_science", label: PROFILE_EDIT_PAGE_STRINGS.fields_list.social_science },
  { value: "other", label: PROFILE_EDIT_PAGE_STRINGS.fields_list.other },
];
