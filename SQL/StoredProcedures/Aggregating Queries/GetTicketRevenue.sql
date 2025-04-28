/*GET TICKET REVENUE*/
GO


CREATE OR ALTER PROCEDURE Parking.GetTicketRevenue
    @StartDate DATETIMEOFFSET,
    @EndDate DATETIMEOFFSET
AS
BEGIN
    WITH DailyStats AS (
        SELECT
            CAST(TimePaid AS DATE) AS PaymentDate,
            SUM(Fee + LateCharge) AS DailyRevenue,
            COUNT(TicketID) AS DailyTicketCount,
            AVG(Fee + LateCharge) AS DailyAverageTicketCost
        FROM Parking.Tickets
        WHERE TimePaid IS NOT NULL
          AND TimePaid BETWEEN @StartDate AND @EndDate
        GROUP BY CAST(TimePaid AS DATE)
    )
    SELECT
        PaymentDate AS [Date],
        DailyRevenue,
        DailyTicketCount,
        DailyAverageTicketCost,
        SUM(DailyRevenue) OVER (ORDER BY PaymentDate ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS CumulativeRevenue,
        SUM(DailyTicketCount) OVER (ORDER BY PaymentDate ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS CumulativeTicketCount,
        CASE
        WHEN SUM(DailyTicketCount) OVER (ORDER BY PaymentDate ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) = 0 THEN NULL
        ELSE
            SUM(DailyRevenue) OVER (ORDER BY PaymentDate ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) * 1.0
            /
            SUM(DailyTicketCount) OVER (ORDER BY PaymentDate ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
END AS CumulativeAverageTicketCost
    FROM DailyStats
    ORDER BY PaymentDate;
END;