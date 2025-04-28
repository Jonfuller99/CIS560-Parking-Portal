DROP PROCEDURE IF EXISTS Parking.OfficerRank;

GO

CREATE PROCEDURE Parking.OfficerRank
    @Month INT,
    @Year INT
    
AS
BEGIN
    SELECT 
        RANK() OVER(ORDER BY SUM(ISNULL(T.Fee, 0)) DESC, COUNT(T.TicketID) DESC) AS OfficerRank,
        O.LastName,
        O.FirstName,
        COUNT(T.TicketID) AS TicketCount,
        SUM(ISNULL(T.Fee, 0)) AS TicketRevenue,
        (
            SELECT TOP(1) L.LotName
            FROM Parking.Tickets T2
                INNER JOIN Parking.Lots L ON L.LotID = T2.LotID
            WHERE O.OfficerID = T2.OfficerID
                AND MONTH(T2.TimeIssued) = @Month
                AND YEAR(T2.TimeIssued) = @Year
            GROUP BY L.LotID, L.LotName
            ORDER BY COUNT(*) DESC
        ) AS MostCommonLot
    FROM Parking.Tickets T
        RIGHT JOIN Parking.Officers O ON O.OfficerID = T.OfficerID
            AND MONTH(T.TimeIssued) = @Month
            AND YEAR(T.TimeIssued) = @Year
    GROUP BY T.OfficerID, O.LastName, O.FirstName, O.OfficerID
    ORDER BY OfficerRank, LastName, FirstName, O.OfficerID
END;

GO
