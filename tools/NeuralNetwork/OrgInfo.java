class OrgInfo implements Comparable<OrgInfo>{

    public String OrgID;
    public Double OrgScore;

    OrgInfo(String OrgID, double OrgScore){
        this.OrgID = OrgID;
        this.OrgScore = OrgScore;
    }

    public Double getOrgScore(){
        return this.OrgScore;
    }

    @Override
	public int compareTo(OrgInfo e) {
		return this.getOrgScore().compareTo(e.getOrgScore());
	}

}