import axios from "../utils/axios-ghn-customize";

export const callProvince = () => {
  return axios({
    method: "GET",
    url: "/master-data/province",
  });
};

export const callDistrict = (provinceId) => {
  return axios({
    method: "POST",
    url: "/master-data/district",
    headers: { "Content-Type": "application/json" },
    data: {
      province_id: provinceId,
    },
  });
};

export const callWard = (districtId) => {
  return axios({
    method: "POST",
    url: "/master-data/ward",
    headers: { "Content-Type": "application/json" },
    data: {
      district_id: districtId,
    },
  });
};
