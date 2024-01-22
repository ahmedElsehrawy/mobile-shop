import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useQuery } from "@apollo/client";
import { SOLD_PRODUCTS_CHARTS } from "../../apollo/sold-products";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Profit Per Week",
    },
  },
};

const HomeComponent = () => {
  const { data, loading } = useQuery(SOLD_PRODUCTS_CHARTS);

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <Container>
        <Section>
          <h1>Profit Per Week</h1>
          <Line
            options={options}
            data={{
              labels: data?.soldProductsCharts?.soldProuctsCharts
                .map((item: any) => {
                  return `${item.from
                    .replace("/2023", "")
                    .replace("/2024", "")} `;
                })
                .reverse(),
              datasets: [
                {
                  fill: true,
                  label: "",
                  data: data?.soldProductsCharts?.soldProuctsCharts
                    .map((item: any) => {
                      return item.totalSaledPrice - item.totalOriginalPrice;
                    })
                    .reverse(),
                  borderColor: "rgb(53, 162, 235)",
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
              ],
            }}
          />
        </Section>
        <Section>
          <h1>Profit Per Month</h1>
          <Line
            options={options}
            data={{
              labels: ["5", "6", "7", "8", "9", "10", "11", "12", "1"],
              datasets: [
                {
                  fill: true,
                  label: "",
                  //just for dummy render
                  data: data?.soldProductsCharts?.soldProuctsCharts
                    .map((item: any, idx: number) => {
                      return (
                        item.totalOriginalPrice +
                        [600, 1000, 2300, 500, 800, 1000, 200, 100, 1800][idx]
                      );
                    })
                    .reverse(),
                  borderColor: "rgb(53, 162, 235)",
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
              ],
            }}
          />
        </Section>
      </Container>
      <SectionYear>
        <h1>Profit Per Year</h1>
        <Line
          options={options}
          data={{
            labels: ["5", "6", "7", "8", "9", "10", "11", "12", "1"],
            datasets: [
              {
                fill: true,
                label: "",
                //just for dummy render
                data: data?.soldProductsCharts?.soldProuctsCharts
                  .map((item: any, idx: number) => {
                    return (
                      item.totalOriginalPrice +
                      [
                        16000, 18000, 12000, 42000, 20000, 35000, 21000, 16000,
                        18000,
                      ][idx]
                    );
                  })
                  .reverse(),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          }}
        />
      </SectionYear>
    </>
  );
};

const Container = styled.main`
  display: flex;
  gap: 32px;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const Section = styled.section`
  width: 50%;
  padding: 16px 32px;
  background-color: #efefef29;
  box-shadow: #97979742 0px 2px 9px;
  border-radius: 16px;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }

  &h1 {
    margin-bottom: 16px;
  }
`;

const SectionYear = styled.section`
  width: 100%;
  padding: 16px 32px;
  max-height: 100vh;
  margin-top: 32px;
  background-color: #efefef29;
  box-shadow: #97979742 0px 2px 9px;
  border-radius: 16px;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }

  &h1 {
    margin-bottom: 16px;
  }
`;

export default HomeComponent;
