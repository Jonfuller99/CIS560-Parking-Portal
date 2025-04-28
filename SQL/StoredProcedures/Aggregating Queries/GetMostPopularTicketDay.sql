GO
CREATE OR ALTER PROCEDURE Parking.GetMostPopularTicketDay
    @StartDate DATETIMEOFFSET,
    @EndDate DATETIMEOFFSET
AS
BEGIN
    DECLARE @DistinctDaysCount INT;


    SELECT @DistinctDaysCount = COUNT(DISTINCT CAST(TimeIssued AS DATE))
    FROM Parking.Tickets
    WHERE TimeIssued BETWEEN @StartDate AND @EndDate;


    WITH DayStats AS (
        SELECT
            DATENAME(WEEKDAY, TimeIssued) AS WeekDay,
            COUNT(TicketID) AS AmountOfTickets,
            SUM(Fee + LateCharge) AS DailyRevenue
        FROM Parking.Tickets
        WHERE TimeIssued BETWEEN @StartDate AND @EndDate
        GROUP BY DATENAME(WEEKDAY, TimeIssued)
    )
    SELECT
        WeekDay,
        AmountOfTickets,
        CASE WHEN @DistinctDaysCount = 0 THEN NULL
             ELSE AmountOfTickets * 1.0 / @DistinctDaysCount
        END AS AverageTicketPerDay,
        DailyRevenue
    FROM DayStats
    ORDER BY AmountOfTickets DESC;
END;