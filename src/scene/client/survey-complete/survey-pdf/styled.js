"use client";
import { StyleSheet } from "@react-pdf/renderer";

// Create styles
export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 12,
  },
  section: {
    backgroundColor: "#3a9034",
    height: 50,
    padding: 10,
    width: "100%",
    justifyContent: "center",
  },
  logo: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  activityWrapper: {
    flexDirection: "column",
    gap: "16px",
    justifyContent: "center",
  },
  activity: {
    width: "80%",
    padding: "8px",
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  answerWrapper: {
    flexDirection: "row",
  },
  questionWrapper: {
    flexDirection: "row",
  },
  question: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
